import Icon from "@/ui/icons/icon";

export function SubscriptionInput() {
  return (
    <div className="has-focus:border-blue-500  border flex gap-1 p-2 rounded-md md:max-w-[180px]">
      <label htmlFor="subscription-email">
        <Icon name="user" />
      </label>
      <input
        disabled
        className="md:w-32 outline-0 w-full"
        id="subscription-email"
        type="email"
        placeholder="E-mail Address"
      />
      <button>
        <Icon name="right_arrow_circular" />
      </button>
    </div>
  );
}
