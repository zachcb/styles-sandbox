export function getNestedPairs(values: Record<string, any>) {
  const pairs: Record<string, any> = {};

  const traverse = (target: Record<string, any>, treePositionName = "") => {
    if (typeof target === "object") {
      Object.entries(target).forEach(([targetName, value]) => {
        console.log(treePositionName, value);
        if (typeof value !== "object") {
          pairs[
            treePositionName ? treePositionName + `-${targetName}` : targetName
          ] = value;
        } else {
          traverse(
            value,
            (treePositionName && `${treePositionName}-`) + `${targetName}`
          );
        }
      });
    }
  };

  traverse(values);

  return pairs;
}
