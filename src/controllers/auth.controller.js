// export const register = async (req, res) => {};

// export const login = async (req, res) => {};

// export const infoUser = async (req, res) => {};

// export const refreshToken = (req, res) => {};

// export const logout = (req, res) => {};

export const register = (req, res) => {
  console.log(req.body);
  res.json({ ok: "register true" });
};

export const login = (req, res) => {
  res.json({ ok: "login true" });
};
