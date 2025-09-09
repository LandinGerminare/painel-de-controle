import Lottie from "lottie-react-web";
import loadingAnimation from "@/gifs/loading/loading.json";

interface LoadingProps {
  height?: string;
}

export default function Loading(props: LoadingProps) {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Lottie
        options={{
          animationData: loadingAnimation,
          loop: true,
        }}
        height={props.height ?? "20rem"}
      />
    </div>
  );
}
