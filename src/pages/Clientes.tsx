import Header from "@/components/header";
import LayoutBase from "@/components/layout-base";
import { Card } from "@/components/ui/card";

export default function Clientes(){
    return(
        <>
            <Header/>
            <div className="flex w-screen h-screen">
                <Card className="w-full h-full pt-16">
                    <LayoutBase
                        title="Clientes"
                        description="Listagem de clientes"
                        visibleModal={true}
                    >
                        
                    </LayoutBase>
                </Card>
            </div>
        </>
    )
}