import { useNavigate } from "@solidjs/router";
import { Text } from "~/components/Text/Text";
import { hasApiKey } from "~/utils/apiKeyUtils";

export default function Home() {
  const navigate = useNavigate();

  if (hasApiKey()) {
    navigate("/pulls", { replace: true });
  } else {
    navigate("/about", { replace: true });
  }

  return <Text>Loading...</Text>;
}
