import { revalidatePath } from "next/cache";
import { parseBody } from "next-sanity/webhook";
import type { NextRequest } from "next/server";

// _type do Sanity → páginas a revalidar quando o conteúdo é publicado.
const PATHS_BY_TYPE: Record<string, string[]> = {
  homeHero: ["/"],
  aboutVideo: ["/"],
  faqItem: ["/"],
  galleryImage: ["/galeria", "/"],
  teamMember: ["/equipa"],
  facility: ["/instalacoes"],
  testimonial: ["/"],
};

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return Response.json(
        { ok: false, error: "Assinatura inválida." },
        { status: 401 },
      );
    }

    const paths = body?._type ? (PATHS_BY_TYPE[body._type] ?? []) : [];
    for (const path of paths) revalidatePath(path);

    return Response.json({ ok: true, revalidated: paths });
  } catch (error) {
    return Response.json(
      { ok: false, error: (error as Error).message },
      { status: 400 },
    );
  }
}
