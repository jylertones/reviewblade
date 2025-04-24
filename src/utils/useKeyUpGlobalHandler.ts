import { useNavigate } from "@solidjs/router";

export function useKeyUpGlobalHandler() {
  const navigate = useNavigate();

  return function onKeyUpGlobalHandler(event: KeyboardEvent) {
    const focusedItem = document.activeElement;
    const allFocusableListItems = document.querySelectorAll(
      "[data-keyboard-focusable]",
    );
    const focusedItemIndex = focusedItem
      ? Array.from(allFocusableListItems).indexOf(focusedItem)
      : -1;

    if (event.key === "p") {
      navigate("/pulls");
      return;
    }

    if (event.key === "g" && focusedItem?.hasAttribute("data-github-link")) {
      const githubLink = focusedItem.getAttribute("data-github-link");
      if (githubLink) {
        window.open(githubLink, "_blank");
        return;
      }
    }

    if (event.key === "ArrowUp" || event.key === "k") {
      if (focusedItemIndex === -1) return;

      allFocusableListItems[Math.max(0, focusedItemIndex - 1)].focus();

      return;
    }

    if (event.key === "ArrowDown" || event.key === "j") {
      allFocusableListItems[
        Math.min(allFocusableListItems.length - 1, focusedItemIndex + 1)
      ].focus();
      return;
    }
  };
}
