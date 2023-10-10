import { UserTemplate } from "@/components";
import React, { useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { FaCheck } from "react-icons/fa";

const get = async () => {
  const session = await getSession();
  return session;
};

const ProductBrandEdit: React.FunctionComponent = () => {
  const { data, status } = useSession();
  const templateParams = {
    title: "Admin",
    userID: data?.user.id,
    userImage: "user.jpg",
    userType: "admin",
  };
  const router = useRouter();
  const { name, symbol } = router.query;

  const update = api.basicUnit.edit.useMutation({
    onError: (err, newTodo, context) => {
      alert(`An error occured }`);
    },
    onSuccess: () => {
      router.push("/basic-unit");
    },
  });

  useEffect(() => {
    if (name && symbol) {
      setEditData({
        existingName: name as string,
        newName: name as string,
        symbol: symbol as string,
      });
    }
  }, [name, symbol]);

  const [editData, setEditData] = useState({
    existingName: name as string,
    newName: name as string,
    symbol: symbol as string,
  });

  const trpc = api.useContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const updateData = () => {
    update.mutate(editData);
  };

  const editData = {
    Symbol: "Gm",
    Name: "Gram",
    Category:"Base"
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-4/6 w-1/2 flex-col rounded-xl bg-[#C4B0FF45]">
          Prodect Brand Edit
          <p className="h-1/6 w-full items-center border-b-2 border-[#11009E] pl-4 pt-2 text-lg font-semibold">
            Product Brands Details
          </p>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Brand Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Symbol}
            />
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            HSN code
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Name}
            />
          </div>
          <div className="flex h-1/6 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Category
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Category}
            />
          </div>
          <div className="flex h-1/6 w-full justify-end space-x-4 px-4">
            {/* <div className="flex h-fit items-center justify-center">
              <div
                className="mr-2 flex h-4 w-4 items-center border-2 border-[#11009E] bg-[#C4B0FF45]"
                onClick={() => {
                  setConfirmed(!confirmed);
                }}
              >
                {confirmed ? <FaCheck className="h-4 w-4" /> : null}
              </div>
              <p>I confirm the deletion</p>
            </div> */}
            <button className="h-1/2 w-1/6 self-center rounded-md bg-[#07096E] font-semibold text-white">
              Cancel
            </button>
            <button className="h-1/2 w-1/6 border border-[#11009E] self-center rounded-md bg-[#C4B0FF] font-semibold ">
              Save
            </button>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
};

export default ProductBrandEdit;
