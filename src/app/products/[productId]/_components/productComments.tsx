import { ProductScore } from "@/app/_components/productScore";
import { formatDate } from "@/lib/helpers/formatDate";
import { TextInput } from "@/ui/form/textInput";

const COMMENTS = [
  {
    user: {
      name: "Gabriel",
      date: Date.now(),
    },
    comment:
      "I neded a fast, efficient laptop for on the go use. Battery life is amazing. Build quality is fantastic. Perfect fit for my needs.",
    score: 4.85,
    feedbacks: {
      likes: 15,
      dislike: 2,
    },
  },
  {
    user: {
      name: "Jimmy Smith",
      date: Date.now(),
    },
    comment:
      "This macbook air at first feels just so big to me using it for school, and after a while, it felt as a perfect size. I look at it sometimes and realize how portable and small it is, but IT FEELS AS BIG AS LIKE A TV SCREEN. It's not a huge computer, but when your doing work and typing or whatever watching youtube it feels like a movie screen, beautiful. I never had such a good computer that just feels like a breath of fresh air. If you are contemplating on buying one, I would get 512 GB of storage and 16 ram. You will not be disappointed if you buy this no matter what, I strongly recommend it.",
    score: 5,
    feedbacks: {
      likes: 8,
      dislike: 0,
    },
  },
  {
    user: {
      name: "sarah Anderson",
      date: Date.now(),
    },
    comment:
      "I neded a fast, efficient laptop for on the go use. Battery life is amazing. Build quality is fantastic. Perfect fit for my needs.",
    score: 4.2,
    feedbacks: {
      likes: 34,
      dislike: 5,
    },
  },
];

export function ProductComments() {
  return (
    <div id="comments">
      <h3 className="text-2xl font-semibold">Comments</h3>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2.5 min-w-[30%]">
          <p>leave your comments here for other customers</p>
          <TextInput />
          <button className="border border-blue-600 text-blue-500 py-2 w-full text-center">
            Comment
          </button>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {COMMENTS.map((comment) => (
            <CommentItem key={comment.score} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: (typeof COMMENTS)[number] }) {
  const formattedDate = formatDate(comment.user.date);
  return (
    <div
      key={comment.score}
      className="border border-gray-300 bg-gray-100 p-3 rounded-lg space-y-2"
    >
      <div className="flex gap-2 items-center">
        <div className="rounded-full w-10 h-10 bg-gray-700"></div>
        <div className="flex flex-col">
          <span className="font-semibold">{comment.user.name}</span>
          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>
        <div className="text-white ms-auto bg-blue-900 rounded-lg py-1 px-1">
          <ProductScore score={comment.score} className="fill-white" />
        </div>
      </div>
      <p>{comment.comment}</p>
    </div>
  );
}
