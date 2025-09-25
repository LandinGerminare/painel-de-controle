import { TripleState } from "@/hooks/triple/tripleState";
import Loading from "@/lib/Loading";
import { JSX } from "react";
import Error from "../Error";

interface baseI {
  component?: JSX.Element;
  containerStyle?: string;
}

interface TripleRenderI<T> {
  tripleState: TripleState<T>;
  successComponent: (data: T) => JSX.Element;
  loading?: baseI;
  failed?: {
    component?: (data: string) => JSX.Element;
    containerStyle?: string;
  };
  initial?: baseI;
}

export default function TripleRender<T>({
  tripleState,
  successComponent,
  loading,
  failed,
  initial,
}: TripleRenderI<T>) {
  switch (tripleState.state) {
    case "Loading":
      return loading?.component ? loading.component : <Loading />;
    case "Failed":
      return failed?.component ? (
        failed.component(tripleState.errorMessage)
      ) : (
        <Error
          errorMessage={tripleState.errorMessage}
          bodyStyle={failed?.containerStyle}
        />
      );
    case "Success":
      return successComponent(tripleState.data);

    case "Initial":
      return initial?.component ? initial.component : <></>;
  }
}
