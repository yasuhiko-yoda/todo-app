const API_BASE_URL = "http://localhost:8080/api";

const handleResponse = async (response, defaultMessage) => {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }

    const text = await response.text();

    return text ? JSON.parse(text) : null;
  }

  let message = defaultMessage;

  try {
    const data = await response.json();

    if (data.message) {
      message = data.message;
    }
  } catch {
    // JSON形式でない場合はdefaultMessageを使用
  }

  const error = new Error(message);
  error.status = response.status;

  throw error;
};

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    credentials: "include",
  });
  return handleResponse(response, "タスク一覧の取得に失敗しました。");

  // if (!response.ok) {
  //   throw new Error("タスク一覧の取得に失敗しました。");
  // }

  // return response.json();
}

export const fetchTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "GET",
    credentials: "include",
  });

  // if (!response.ok) {
  //   const error = new Error("タスクの取得に失敗しました。");
  //   error.status = response.status;
  //   throw error;
  // }

  return handleResponse(response, "タスクの取得に失敗しました。");
};

export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  // if (!response.ok) {
  //   const error = new Error("タスクの登録に失敗しました。");
  //   error.status = response.status;
  //   throw error;
  // }

  return handleResponse(response, "タスクの登録に失敗しました。");
}

export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  // if (!response.ok) {
  //   const error = new Error("タスクの更新に失敗しました。");
  //   error.status = response.status;
  //   throw error;
  // }

  return handleResponse(response, "タスクの更新に失敗しました。");
};

export const deleteTask = async (taskId) => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });
  // if (!response.ok) {
  //   const error = new Error("タスクの削除に失敗しました。");
  //   error.status = response.status;
  //   throw error;
  // }
  return handleResponse(response, "タスクの削除に失敗しました。");

}




