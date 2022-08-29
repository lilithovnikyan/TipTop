import MainLayout from "./../components/MainLayout";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="bg_image">
        <h1 className="wear_better">Wear better, look better.</h1>
        <div className="cover_bg"></div>
      </div>
      <Link href={"/collections"}>
        <a className="shop_now_btn">Shop Now</a>
      </Link>
    </MainLayout>
  );
}
