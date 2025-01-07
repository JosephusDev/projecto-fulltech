import Lottie from "lottie-react";
import loading from "@/assets/img/loading.json"

export default function Loading(){
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <Lottie animationData={loading} className="w-1/6 animate-fade-in"/>
        </div>
    )
}