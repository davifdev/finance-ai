/* eslint-disable @typescript-eslint/no-explicit-any */
import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("❌ Erro: Variáveis de ambiente do Stripe não configuradas.");
    return new NextResponse("Config Error", { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    console.error("❌ Erro: Assinatura do Stripe ausente no cabeçalho.");
    return new NextResponse("Missing Signature", { status: 400 });
  }

  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia",
  });

  let event: Stripe.Event;

  try {
    // Primeira ação: Validação do Webhook
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    // CORREÇÃO: Força o status code a ser 400 se falhar na assinatura, evitando o "status code 0"
    console.error(
      "❌ Erro detalhado na validação do Webhook do Stripe:",
      err.message || err
    );
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case "invoice.paid": {
      const invoice = event.data.object;
      const customer = invoice.customer;
      const subscription = invoice.parent.subscription_details.subscription;
      const subscription_details = invoice.parent.subscription_details;

      const clerkUserId = subscription_details?.metadata?.clerk_user_id;
      if (!clerkUserId) {
        console.warn(
          "⚠️ Evento invoice.paid recebido, mas clerk_user_id não foi encontrado nos metadados.",
          clerkUserId
        );

        return new NextResponse("Missing clerk_user_id metadata", {
          status: 400,
        });
      }

      const stripeCustomerId = String(customer);
      const stripeSubscriptionId = String(subscription);
      try {
        await clerkClient().users.updateUserMetadata(clerkUserId, {
          privateMetadata: {
            stripeCustomerId,
            stripeSubscriptionId,
          },
          publicMetadata: {
            subscriptionPlan: "premium",
          },
        });
        console.log(
          `✅ Usuário do Clerk ${clerkUserId} atualizado com sucesso.`
        );
      } catch (clerkError: any) {
        // CORREÇÃO: Força o status code a ser 500 se falhar no Clerk, evitando o "status code 0"
        console.error(
          "❌ Erro detalhado ao atualizar dados no Clerk:",
          clerkError.message || clerkError
        );
        return new NextResponse("Clerk Update Error", { status: 500 });
      }
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id
      );
      const clerkUserId = subscription.metadata.clerk_user_id;
      if (!clerkUserId) {
        console.warn(
          "⚠️ Evento recebido, mas clerk_user_id não foi encontrado nos metadados.",
          clerkUserId
        );
        return NextResponse.error();
      }

      const stripeCustomerId = null;
      const stripeSubscriptionId = null;

      try {
        await clerkClient().users.updateUserMetadata(clerkUserId, {
          privateMetadata: {
            stripeCustomerId,
            stripeSubscriptionId,
          },
          publicMetadata: {
            subscriptionPlan: null,
          },
        });
        console.log(
          `✅ Usuário do Clerk ${clerkUserId} atualizado com sucesso.`
        );
      } catch (clerkError: any) {
        // CORREÇÃO: Força o status code a ser 500 se falhar no Clerk, evitando o "status code 0"
        console.error(
          "❌ Erro detalhado ao atualizar dados no Clerk:",
          clerkError.message || clerkError
        );
        return new NextResponse("Clerk Update Error", { status: 500 });
      }
    }
  }

  return NextResponse.json({ received: true });
};
