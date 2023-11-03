import TestComp from "@/components/MemberComponents/testComp"
const ob = [{ name: "A區" }, { name: "B區" }, { name: "C區" }]

export default function TEST2() {
  return <TestComp ob={ob}></TestComp>
}
