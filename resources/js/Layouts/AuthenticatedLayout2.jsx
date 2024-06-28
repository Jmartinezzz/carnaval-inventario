import Aside from "@/Components/Aside";
import Content from "@/Components/Content";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header"

export default function Authenticated2({ user, header, children }) {
    return (
        <div>

            <Header />
            <Aside user={user} />
            <Content>
                {header && (
                    <header className="text-dark">
                        <div className="">{header}</div>
                    </header>
                )}
                <main>{children}</main>
            </Content>
            <Footer />
        </div>

    );
}
