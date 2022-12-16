!!! Warning
We are shutting down our hosted Hub infrastructure. Please see this [deprecation notice](https://github.com/textileio/textile/issues/578) for details, including details about FIL balances.

Every developer, organization, and API user on the Hub has its own Filecoin address. Below, we'll focus on exploring the Filecoin wallet and tools through the [Hub CLI](../hub), as this is where you'll be able to start using Filecoin the fastest. Just know, you can build all of this into your app for your users too using our API and client libraries.

## Check your address and balances

**Personal account**

```Bash
hub buck addrs
```

???+ success

    ```Bash
    > Success!
    {
      "addresses":  [
        {
          "name":  "Initial Address",
          "address":  "f3wagei5pgdglrszjvowoc6clsbp5fqyplk3gze6vrttvxk4faxnjri5kqa5foaikgea7lv2jnlbvubywjp2pa",
          "type":  "bls",
          "balance":  "250000000000000000",
          "verifiedClientInfo":  null
        }
      ]
    }
    > Funds in this wallet are for network and storage fees only; they cannot be transferred or sold.
    > Get your address verified on https://plus.fil.org/landing.
    ```

**Check your organization address**

```sh
HUB_ORG=<org name> hub buck addrs
```

Remember, all members of an organization have access to this shared address. Each with the ability to store data using any Filecoin it holds.

## Funding your address

!!! Warning
We are shutting down our hosted Hub infrastructure. Do not send any funds to any Hub-based Filecoin addresses.

Textile is not able to provide any financial services. Due to that restriction, Filecoin you deposit in any address on the Hub can only be used to pay network fees for gas, storage, and retreival.

## Fil+ verification

The Filecoin network has a concept of verified clients. These are addresses on the network that have demonstrated to some extent that they are real projects making storage requests with important data. You can get a great overview of the progam on the helpful notes at [verify.glif.io/](https://verify.glif.io/) or you can read the more [technical overview on GitHub](https://github.com/filecoin-project/filecoin-plus-client-onboarding#introduction).

The primary benefit to getting verified is that your storage costs are dramatically reduced. Sometimes to nearly nothing. You can check out the [miner index](../miner-index) to see some of the latest prices quoted by miners on the network for verified clients. We strongly recommend that every user get verified as soon as they are capable.

### Getting verified

The quickest path to verification is also through [verify.glif.io/](https://verify.glif.io/) where you can get 8GiB of verified storage by simply authenticating with your GitHub account.

If you need more than 8GiB of storage, there is a more thorough application and vetting process that you can start on [plus.fil.org/](https://plus.fil.org/). For most serious projects, this is the preferred route to verification.

### Verification status

You can check your address verification status on [verify.glif.io/](https://verify.glif.io/).
