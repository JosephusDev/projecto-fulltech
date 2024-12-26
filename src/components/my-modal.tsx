import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";


interface MyModalProps {
    titulo_modal: string;
    children?: React.ReactNode;
    triggers?: React.ReactNode;
    icone?: React.ReactNode;
    onClick?: () => void;
}

export default function MyModal({ 
    children, titulo_modal, icone, triggers, onClick 
}: MyModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{triggers}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">{titulo_modal}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {children && (
                        children
                    )}
                </div>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button className="border-primary" variant={"secondary"}>Cancelar</Button>
                    </DialogClose>
                    <Button onClick={onClick}>{icone ? icone : 'Confirmar'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
