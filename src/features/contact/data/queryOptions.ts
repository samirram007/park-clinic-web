import { useMutation } from "@tanstack/react-query"
import { storeContactService } from "./api"





export function useContactMutation() {
    return useMutation({
        mutationFn: async (payload: any) => { 
            return await storeContactService(payload)
        },
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
        }
    })
}