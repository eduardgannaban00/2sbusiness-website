import { handleContactRequest } from "../../shared/contact-core.mjs";

export async function onRequest(context) {
  return handleContactRequest(context.request, context.env);
}
