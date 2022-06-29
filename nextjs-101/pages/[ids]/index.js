import { useRouter } from "next/router";

function dynamicFolder() {
  const router = useRouter();
  // NOTE: We used "ids" because it was the name of the dynamic folder
  const id = router.query.ids

  return (
    <div>
      Dynamic Folder names for dynamic nested pages id: {id}
    </div>
  );
}

export default dynamicFolder;