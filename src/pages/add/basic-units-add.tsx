import { UserTemplate } from "@/components";
import React from "react";
import { useSession } from "next-auth/react";

const BasicUnitsAdd: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const [addData, setAddData] = useState({
    name: "",
    symbol: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAddData({
      ...addData,
      [name]: value,
    });
  };

  const add = api.basicUnit.create.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/basic-unit");
    },
  });

  const create = () => {
    console.log(addData);
    if (addData.name != "" || addData.symbol != "") {
      add.mutate(addData);
    } else {
      alert("Be sure to fill all fields");
    }
  };
  
  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
          <p className="h-1/4 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
            Basic Unit Details
          </p>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Symbol
            <input className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
          </div>
          <div className="flex h-1/4 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none" />
          </div>
          <div className="flex h-1/4 w-1/2 justify-between self-end px-4">
            <button className="h-1/2 w-[40%] self-center rounded-md bg-[#07096E] font-semibold text-white">
              Cancel
            </button>
            <button className="h-1/2 w-[40%] self-center rounded-md bg-[#C4B0FF] font-semibold">
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default BasicUnitsAdd;
