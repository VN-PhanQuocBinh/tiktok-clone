export default function mergeRef(...refs) {
   return (DOM_element) => {
      refs.forEach((ref) => {
         if (typeof ref === "function") {
            ref(DOM_element);
         } else if (ref && typeof ref === "object") {
            ref.current = DOM_element;
         }
      });
   };
}
