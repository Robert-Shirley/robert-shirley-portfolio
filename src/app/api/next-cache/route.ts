import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  revalidatePath("/projects/ecommerce/*");

  revalidatePath("/projects/ecommerce");
  revalidatePath("/projects/ecommerce/[category]");
  revalidatePath("/projects/ecommerce/(.)");

  return NextResponse.json({
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
