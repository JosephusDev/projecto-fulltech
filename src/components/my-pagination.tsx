import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    setItemsPerPage: (value: number) => void;
    handlePageChange: (page: number) => void;
}

export default function MyPagination(
    { currentPage, totalPages, itemsPerPage, setItemsPerPage, handlePageChange }: IPaginationProps
) {
    return(
        <Pagination className="my-5 gap-x-5 items-center">
            <div className="flex items-center gap-x-2">
                <Label>Itens</Label>
                <Select
                    value={String(itemsPerPage)}
                    onValueChange={(v) => setItemsPerPage(Number(v))}
                >
                    <SelectTrigger className="w-3/4">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Label>Página {currentPage} de {totalPages}</Label>
            <PaginationContent>
                <PaginationItem>
                        <Button 
                        size={"icon"} 
                        variant={"outline"}
                        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1}
                        >
                        <ChevronLeft size={20} />
                        </Button>
                    </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                            <PaginationLink
                                href="#"
                                onClick={() => handlePageChange(i + 1)}
                                isActive={currentPage === i + 1}
                            >
                                {i + 1}
                            </PaginationLink>
                            </PaginationItem>
                        ))}
                    <PaginationItem>
                        <Button 
                        size={"icon"} 
                        variant={"outline"}
                        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={20} />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}