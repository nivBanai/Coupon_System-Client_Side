import "./EmptyCouponsView.css";

function EmptyCouponsView(): JSX.Element {
    return (
        <div className="EmptyCouponsView FlexColPage">
            <h1>No Coupons Currently,<br />The Queenpins Are Probably On A Break.<br /> Please Check Again Later.</h1>
            <img src="https://media2.giphy.com/media/YNdaDV2sTvDpcTV8Yq/giphy.gif" alt="" />
        </div>
    );
}

export default EmptyCouponsView;
