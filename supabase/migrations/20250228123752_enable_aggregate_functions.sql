ALTER ROLE authenticator SET pgrst.db_aggregates_enabled = 'true';

ALTER USER authenticator SET plan_filter.statement_cost_limit = 1e7;

ALTER USER authenticated SET plan_filter.statement_cost_limit = 1e6;