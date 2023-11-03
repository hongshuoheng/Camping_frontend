import Layout from "@/components/Layouts/Layout"

export default function testPage() {
  return (
    <Layout
      pageTitle={"pageForTest"}
      contentTitle={"TEST頁面"}
      bread={"test/test01"}
    >
      <select value="1">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      123123
      <select value={"1"}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
      <div></div>
    </Layout>
  )
}
