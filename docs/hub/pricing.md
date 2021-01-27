We offer a generous free tier so you can signup and start building right away. 

Billing can be setup using the Hub CLI for your Personal account or any Organization you create. If you need volume discounts or dedicated support, please contact us at [support@textile.io](mailto:support@textile.io).

## Prices

**Pay only for what you use.**

| API Pricing | Free Limit | Cost |
| :------ | :------ | :------ |
| Storage | {{billing.free_stored_data}} |  {{billing.stored_data}}
| ThreadDB Reads | {{billing.free_instance_reads}} |  {{billing.instance_reads}}
| ThreadDB Writes | {{billing.free_instance_writes}} |  {{billing.instance_writes}}
| Network Egresss | {{billing.free_network_egress}} |  {{billing.network_egress}}

_Storage includes all data pinned to IPFS. It does not include archives you submit to Filecoin._

## Grace Period

Billing starts on any account the first time they go over any **Free Limit**.

When an account triggers billing for the first time, they enter a **30-day** grace period in which they should complete the billing setup on their account. 

Billing can be set up on an account at any time by using the Hub CLI:

```bash
hub billing --help
```

## Other Quotas

Each entity above has its own quota no matter which *role* it is (Developer, Org, or User). 

| Limits | |
| :------ | :------ |
| Max Threads Per Owner | {{limits.max_threads_per_owner}} |
| Max Single Bucket Size | {{limits.max_bucket_size}} |
| Minimum Filecoin Deal Size | {{limits.minimum_filecoin_deal_size}} |
