function seed(dbName) {
  db = db.getSiblingDB(dbName);
  db.createUser({
    user: user,
    pwd: password,
    roles: [{ role: 'readWrite', db: dbName }],
  });
}

seed('gateway-db', 'gateway-db-user', 'changeit');
seed('gateway-test-db', 'gateway-test-db-user', 'changeit');
