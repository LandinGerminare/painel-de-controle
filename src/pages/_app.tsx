import "@/styles/globals.css";
import { BoundaryError } from "@/types/ApplicationError";
import { reportApplicationError } from "@/utils/ReportApplicationError";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ErrorBoundary } from "react-error-boundary";
import { useWindowSize } from "usehooks-ts";
import { msalConfig } from "@/entraid/authConfig";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import { LayoutProvider } from "@/context/Layout";
import { ModalProvider } from "@/context/Modal";
import { AuthProvider } from "@/context/Auth";
import { ClientRegistrationProvider } from "@/context/ClientRegistration";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { height, width } = useWindowSize();
  const msalInstance = new PublicClientApplication(msalConfig);

  return (
    <>
      <Head>
        <title>Painel de Controle</title>
      </Head>
      <ErrorBoundary
        fallbackRender={(_) => appContent()}
        onError={(error, info) => {
          const boundaryError: BoundaryError = {
            type: "BOUNDARY",
            route: {
              path: router.pathname,
              query: router.query,
            },
            stackTrace: info.componentStack ?? "",
            text: error.message,
            userAgent: navigator.userAgent,
            screen: {
              height: height,
              width: width,
            },
          };
          reportApplicationError(boundaryError);
        }}
      >
        {appContent()}
      </ErrorBoundary>
    </>
  );

  function appContent() {
    return (
      <MsalProvider instance={msalInstance}>
        <AuthProvider>
          <ModalProvider>
            <NextNProgress
              color="var(--primary-500)"
              options={{ showSpinner: false }}
            />
            {["/", "/404"].includes(router.pathname) ? (
              <Component {...pageProps} />
            ) : (
              <LayoutProvider>
                <ClientRegistrationProvider>
                  <Component {...pageProps} />
                </ClientRegistrationProvider>
              </LayoutProvider>
            )}
            <ToastContainer />
          </ModalProvider>
        </AuthProvider>
      </MsalProvider>
    );
  }
}
