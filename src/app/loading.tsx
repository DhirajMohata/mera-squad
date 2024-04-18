import { LoadingText } from "@/components/site/loaders"
import Container from "@/components/ui/container"
import Image from "next/image"

export default function Home() {
  return (
    <Container className="space-y-4">
      <LoadingText
        text="Comeeee on Vercel.....!"
        className="text-2xl font-medium text-primary"
      />
      <div className="relative mx-auto size-[350px]">
        <Image src={"/loading.gif"} alt="loading gif" fill />
      </div>
    </Container>
  )
}
