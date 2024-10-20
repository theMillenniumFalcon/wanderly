import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/seperator";

export const runtime = "edge";

export default function Home() {
  return (
    <div className="w-full mt-8">
      <h1 className="md:text-4xl sm:text-3xl text-2xl mb-4 font-semibold">
        Wanderly
      </h1>
      <div className="text-muted-foreground">
        Check the project out on{" "}
        <a
          href="https://github.com/themillenniumfalcon/wanderly"
          target="_blank"
        >
          <Button className=" p-0 h-auto text-base" variant="link">
            GitHub
          </Button>
        </a>
        .
      </div>
      <Separator className="my-8" />
      
    </div>
  );
}
