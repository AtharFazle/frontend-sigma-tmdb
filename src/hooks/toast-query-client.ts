// toast-query-client.ts
import { useQueryClient } from "@tanstack/vue-query";
import { useToast } from '@/components/ui/toast/use-toast'

export const useToastAndQueryClient = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  return { queryClient, toast };
};
