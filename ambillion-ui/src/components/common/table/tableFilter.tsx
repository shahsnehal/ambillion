// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TableFilter = ({ filterText, onFilter, onClear, placeholder }: any) => (
    <div className="mb-3 col-sm-12 col-md-6 col-lg-12 col-xxl-12">
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                aria-label="Search Input"
                aria-describedby="basic-addon1"
                value={filterText}
                onChange={onFilter}
            ></input>
            <button className="btn bg-danger-subtle text-danger" type="button" onClick={onClear}>
                Reset
            </button>
        </div>
    </div>
);
