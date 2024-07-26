import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCardProduct from "../components/VerticalCardProduct"

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />

            <HorizontalCardProduct category={"Air Filter"} heading={"Best Quality Air Filter"} />
            <HorizontalCardProduct category={"Brake Shoe"} heading={"Top Brake Shoe"} />
            <HorizontalCardProduct category={"Cam Gear Set"} heading={"Cam Gear Set"} />
            <HorizontalCardProduct category={"Cam Sprocket"} heading={"Cam Sprocket"} />
            <HorizontalCardProduct category={"Carborator"} heading={"Carborator"} />
            <HorizontalCardProduct category={"Chain Lock"} heading={"Chain Lock"} />
            <HorizontalCardProduct category={"Chimta Bush"} heading={"Chimta Bush"} />
            <HorizontalCardProduct category={"Clutch"} heading={"Clutch"} />

            <VerticalCardProduct category={"Colls"} heading={"Colls"} />
            <VerticalCardProduct category={"Gears"} heading={"Gears"} />
            <VerticalCardProduct category={"Handle"} heading={"Handle"} />
            <VerticalCardProduct category={"Needle Jet Set"} heading={"Needle Jet Set"} />
            <VerticalCardProduct category={"O Rings"} heading={"O Rings"} />
            <VerticalCardProduct category={"Pressure Plates"} heading={"Pressure Plates"} />
            <VerticalCardProduct category={"Rocker Pin"} heading={"Rocker Pin"} />
            <VerticalCardProduct category={"Seals"} heading={"Seals"} />
            <VerticalCardProduct category={"Spark Plug"} heading={"Spark Plug"} />
            <VerticalCardProduct category={"Tappet Screw"} heading={"Tappet Screw"} />
        </div>
    )
}
export default Home