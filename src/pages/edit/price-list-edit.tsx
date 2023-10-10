import { UserTemplate } from "@/components";
import React from "react";
import { getSession, useSession } from "next-auth/react";

const get = async () => {
  const session = await getSession();
  return session;
};

const PriceListEdit: React.FunctionComponent = () => {
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
  };

  return (
    <UserTemplate templateParams={templateParams}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex h-1/3 w-1/3 flex-col rounded-xl bg-[#C4B0FF45]">
            Price List Edit
          <p className="h-1/3 w-full items-center border-b-2 border-[#11009E] pl-4 text-lg font-semibold">
          Price List Details
          </p>
          <div className="flex h-1/3 items-center justify-between border-b-2 border-[#11009E] px-4 text-lg font-semibold">
            Name
            <input
              className="rounded-md border border-[#11009E] bg-[#C4B0FF45] px-4 outline-none"
              value={editData.Name}
            />
          </div>
          <div className="flex h-1/3 w-1/2 justify-between self-end px-4">
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

export default PriceListEdit;
