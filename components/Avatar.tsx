import Image from "next/image";
import { UserDetails } from "@/types";



const Avatar = () => {
    return ( 
        <img 
        src="/images/liked.png" 
        alt="avatar" 
        className="rounded-full"
        />
     );
}
 
export default Avatar;