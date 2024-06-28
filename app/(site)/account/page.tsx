import Avatar from "@/components/Avatar";
import Header from "@/components/Header";
import { UserDetails } from "@/types";
import Image from "next/image";
import AccountContent from "./components/AccountContent";

interface AccountProps {
    avatar_url: UserDetails
}

const Account: React.FC<AccountProps> = ({
    avatar_url,
}) => {
    let avatar = avatar_url

    return ( 
        <div
        className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
        "
        >
            <Header className="from-bg-neutral-900">
            <div className="mb-2 flex flex-col gap-y-6">
                <h1 className="text-white text-3xl font-semibold">
                    Accont Settings
                </h1>
                
            </div>
            </Header>
            <AccountContent />
        </div>
     );
}
 
export default Account;