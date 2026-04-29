import { envConfig } from "./config";

export async function convertFile(service: string, formData: FormData): Promise<Response> {
  const servicePath = service === "pdf-to-doc" ? "pdf-to-word" : service;
  
  return fetch(`${envConfig.apiUrl}/api/convert/${servicePath}`, {
    method: "POST",
    body: formData,
  });
}
