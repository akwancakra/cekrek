export default function StandardRecomendation() {
    return (
        <>
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Judul</span>
                </div>
                <input
                    type="text"
                    placeholder="Berikan judul rekomendasi..."
                    className="input input-bordered px-3 py-2 text-sm h-fit min-h-fit w-full"
                />
            </label>
            <label className="form-control">
                <div className="label">
                    <span className="label-text">Deskripsi/ Informasi</span>
                </div>
                <textarea
                    className="textarea textarea-bordered px-3 py-2 h-24"
                    placeholder="Deskripsi tentang rekomendasi..."
                    defaultValue={""}
                />
            </label>
            <div>
                <p className="text-sm px-1 py-2">Pilih icon</p>
            </div>
        </>
    );
}
