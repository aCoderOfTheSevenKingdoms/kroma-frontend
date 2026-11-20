import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
    return (
        <Card size="sm" className="gap-0 overflow-hidden pt-0 pb-0">
            <Skeleton className="aspect-[3/4] w-full rounded-none" />
            <div className="flex flex-col gap-2 p-2.5">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="mt-1.5 h-8 w-full" />
            </div>
        </Card>
    );
}

export { ProductCardSkeleton };
