import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
   static async getInitialProps(ctx) {
      const initialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
   }

   render() {
      return (
         <Html>
            <Head>
               <link rel="preconnect" href="https://fonts.googleapis.com" />
               <link
                  rel="preconnect"
                  href="https://fonts.gstatic.com"
                  crossOrigin
               />
               <link
                  rel="preload"
                  as="style"
                  href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700&display=swap"
               />
               <link rel="stylesheet" href="/fontaw/css/all.min.css" />
            </Head>
            <body>
               <Main />
               <NextScript />
               {/* Empty script tag as chrome bug fix, see https://stackoverflow.com/a/42969608/943337 */}
               <script> </script>
            </body>
         </Html>
      );
   }
}

export default MyDocument;
