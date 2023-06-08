
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center mt-3 mb-6 w-4/12">
            <p className="text-yellow-500">-------- {subHeading} --------</p>
            <h3 className="text-3xl uppercase border-y-4 py-5">{heading}</h3>
        </div>
    );
};

export default SectionTitle;