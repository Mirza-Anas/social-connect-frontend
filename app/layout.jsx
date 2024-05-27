import Nav from "../component/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "../context";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="/css/styles.css" />
            </head>
            <body>
                <UserProvider>
                    <Nav />
                    <ToastContainer />
                    <AntdRegistry>{children}</AntdRegistry>
                </UserProvider>
            </body>
        </html>
    );
}
