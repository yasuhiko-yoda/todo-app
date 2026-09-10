import { Link } from "react-router-dom"
export const NotFound = () => {
	return (
		<div>
			ページが存在しません
			<div>
				<Link to="/tasks">一覧に戻る</Link>
			</div>
		</div>
	)
}