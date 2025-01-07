
import { useAuth } from '@/context/AuthContext'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
export default function MyAvatar(){
    const { user } = useAuth()
    return(
        <TooltipProvider>
            <Tooltip>
            <TooltipTrigger asChild>
            <Avatar className='w-8 h-8'>
                <AvatarImage src={user?.picture} />
                <AvatarFallback>{(user?.firstName && user.lastName) ? `${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}` : user?.firstName?.charAt(0)}</AvatarFallback>
            </Avatar>
            </TooltipTrigger>
            <TooltipContent>
                <p>{(user?.firstName && user.lastName) ? `${user?.firstName} ${user?.lastName}` : user?.firstName}</p>
            </TooltipContent>
            </Tooltip>
      </TooltipProvider>
    )
}