import Header from "@/components/header";
import LayoutBase from "@/components/layout-base";
import { Card } from "@/components/ui/card";

export default function Dashboard(){
    return(
        <>
            <Header/>
            <div className="flex w-screen h-screen">
                <Card className="w-full h-full pt-16">
                    <LayoutBase
                        title="Dashboard"
                        description="Visualização das actividades"
                    >
                        
                    </LayoutBase>
                </Card>
            </div>
        </>
    )
}