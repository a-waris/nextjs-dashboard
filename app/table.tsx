import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { Article, TArticleList } from './types/article';

export default async function ArticleTable({
  articlesList
}: {
  articlesList: TArticleList | undefined;
}) {
  debugger;
  if (!articlesList || articlesList.result.length === 0) {
    return <div>No articles found.</div>;
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
          <TableHeaderCell>Public</TableHeaderCell>
          <TableHeaderCell>Tags</TableHeaderCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {articlesList.result.map((article) => (
          <TableRow key={article.id}>
            <TableCell>
              <Text>{article.title}</Text>
            </TableCell>
            <TableCell>
              <Text>{article.category}</Text>
            </TableCell>
            <TableCell>
              <Text>{article.isPublic ? 'Yes' : 'No'}</Text>
            </TableCell>
            <TableCell>
              {article.tags?.map((t) => (
                <Text>{t}</Text>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
