// import { QueryClient } from '@tanstack/vue-query';

import { VueQueryPluginOptions } from "@tanstack/vue-query";

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: { queries: { 
        staleTime: 36000,
        retryDelay: 10000,
        refetchIntervalInBackground:false,
        retry(failureCount) {
        if (failureCount < 2) {
            return true;
        }
        return false;
        },
    }},
  },
  enableDevtoolsV6Plugin: true,
}


export default vueQueryPluginOptions