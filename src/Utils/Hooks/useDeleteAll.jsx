import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";
import request from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";

const useDeleteAll = (reFetchKeys, setIsCheck) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  return useMutation((deleteIds) => request({ url: `${reFetchKeys}/deleteAll`, method: "post", data: { ids: deleteIds } }, router), {
    onSuccess: (resData) => {
      SuccessHandle(resData, false, false, "Deleted Successfully");
      reFetchKeys && queryClient.invalidateQueries({ queryKey: reFetchKeys });
      setIsCheck([]);
    },
  });
};

export default useDeleteAll;
