import BannerProduct from "../components/BannerProduct"
import CategoryList from "../components/CategoryList"
import HorizontalCardProduct from "../components/HorizontalCardProduct"
import VerticalCardProduct from "../components/VerticalCardProduct"
import BikeList from "../components/BikeList"

const Home = () => {
    return (
        <div>
            <CategoryList />
            <BannerProduct />
            <BikeList />

            <HorizontalCardProduct category={"Air Filters & Intakes"} heading={"Best Air Filters & Intakes"} />
            <HorizontalCardProduct category={"Bearings"} heading={"Top's Bearings"} />

            <VerticalCardProduct category={"Body Parts"} heading={"Body Parts"} />
            <VerticalCardProduct category={"Battery"} heading={"Battery"} />
            <VerticalCardProduct category={"Brakes"} heading={"Brakes"} />
            <VerticalCardProduct category={"Carburetors"} heading={"Carburetors"} />
            <VerticalCardProduct category={"Control Cables"} heading={"Control Cables"} />
            <VerticalCardProduct category={"Engine Parts"} heading={"Engine Parts"} />
            <VerticalCardProduct category={"Electrical Parts"} heading={"Electrical Parts"} />
            <VerticalCardProduct category={"Jumps & Shocks"} heading={"Jumps & Shocks"} />
            <VerticalCardProduct category={"Lubricants"} heading={"Lubricants"} />
            <VerticalCardProduct category={"Meters"} heading={"Meters"} />
        </div>
    )
}
export default Home